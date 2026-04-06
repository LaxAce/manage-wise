"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import useGeneralStore from "@store/general";
import { PageLayout } from "@components/layouts";
import { useGetBoards, useGetBoard } from "@hooks/useBoard";
import { AddColumn, EmptyState, TaskColumn } from "@components/taskboard";

function BoardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSideBarOpen = useGeneralStore(state => state.isSideBarOpen);
  const activeBoardId = useGeneralStore(state => state.activeBoardId);
  const setActiveBoardId = useGeneralStore(state => state.setActiveBoardId);

  const { data: boardsData, isLoading: boardsLoading } = useGetBoards();
  const boards = boardsData?.boards ?? [];

  // On first load: read boardId from URL, fall back to first board
  useEffect(() => {
    if (!boards.length) return;

    const paramId = searchParams.get("boardId");
    const isValid = paramId && boards.some((b: any) => b.id === paramId);

    if (isValid) {
      // URL has a valid boardId — sync it into the store
      setActiveBoardId(paramId!);
    } else {
      // No valid URL param — use first board and write it into the URL
      const firstId = boards[0].id;
      setActiveBoardId(firstId);
      router.replace(`/board?boardId=${firstId}`);
    }
  }, [boards.length]);

  const boardId = activeBoardId;

  const { data: boardColumns, isLoading: boardLoading } = useGetBoard(boardId);
  const columns = boardColumns ?? [];

  const isLoading = boardsLoading || boardLoading;

  return (
    <PageLayout>
      <main
        className={`pt-6 pl-5 overflow-x-auto overflow-y-hidden sm:overflow-auto h-[calc(100svh-65px)] sm:h-[calc(100svh-81px)] md:h-[calc(100svh-89px)] ${isSideBarOpen ? "sm:w-[calc(100svw-250px)] md:w-[calc(100svw-300px)]" : "w-full"
          }`}
      >
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="animate-spin w-8 h-8 text-violet-635FC7" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        ) : columns.length > 0 ? (
          <div className="flex gap-6">
            {columns.map((column: any) => (
              <TaskColumn
                key={column.id}
                id={column.id}
                title={column.name}
                colorTag={column.colorTag}
                boardId={boardId}
                items={column.tasks?.map((task: any) => ({
                  id: task.id,
                  title: task.title,
                  subTasks: {
                    completed: task.subTasksCompleted ?? 0,
                    total: task.subTasksTotal ?? 0,
                  },
                  onClick: () => { },
                })) ?? []}
              />
            ))}
            <AddColumn boardId={boardId} onClick={() => { }} />
          </div>
        ) : (
          <EmptyState boardId={boardId} />
        )}
      </main>
    </PageLayout>
  );
}

export default function Board() {
  return (
    <Suspense>
      <BoardContent />
    </Suspense>
  );
}
