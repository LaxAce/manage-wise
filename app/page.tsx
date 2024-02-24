"use client";

import useGeneralStore from "@store/general";
import { PageLayout } from "@components/layouts";
import { AddColumn, EmptyState, TaskColumn } from "@components/taskboard";

const data = [
  {
    title: "TODO",
    items: [
      {
        title: "Build UI for onboarding flow",
        subTasks: {
          completed: 0,
          total: 6,
        },
      },
      {
        title: "Build UI for onboarding flow",
        subTasks: {
          completed: 6,
          total: 6,
        },
      },
      {
        title: "Research pricing points of various competitors and trial different business models",
        subTasks: {
          completed: 0,
          total: 1,
        },
      },
    ],
  },
  {
    title: "DOING",
    items: [
      {
        title: "Add account management endpoints",
        subTasks: {
          completed: 2,
          total: 2,
        },
      },
      {
        title: "Build UI for onboarding flow",
        subTasks: {
          completed: 11,
          total: 20,
        },
      },
      {
        title: "Build UI for onboarding flow",
        subTasks: {
          completed: 0,
          total: 3,
        },
      },
      {
        title: "Research pricing points of various competitors and trial different business models",
        subTasks: {
          completed: 0,
          total: 8,
        },
      },
      {
        title: "Build UI for onboarding flow",
        subTasks: {
          completed: 0,
          total: 6,
        },
      },
    ],
  },
  {
    title: "DONE",
    items: [
      {
        title: "Build UI for onboarding flow",
        subTasks: {
          completed: 4,
          total: 6,
        },
      },
      {
        title: "Build UI for onboarding flow",
        subTasks: {
          completed: 0,
          total: 0,
        },
      },
      {
        title: "Build UI for onboarding flow",
        subTasks: {
          completed: 0,
          total: 6,
        },
      },
      {
        title: "Research pricing points of various competitors and trial different business models",
        subTasks: {
          completed: 0,
          total: 2,
        },
      },
      {
        title: "Build UI for onboarding flow",
        subTasks: {
          completed: 0,
          total: 1,
        },
      },
      {
        title: "Build UI for onboarding flow",
        subTasks: {
          completed: 0,
          total: 9,
        },
      },
      {
        title: "Build UI for onboarding flow",
        subTasks: {
          completed: 4,
          total: 4,
        },
      },
      {
        title: "Build UI for onboarding flow",
        subTasks: {
          completed: 0,
          total: 0,
        },
      },
    ],
  },
];

export default function Home() {
  const isSideBarOpen = useGeneralStore(state => state.isSideBarOpen);

  const displayColumns = (data: any) => (
    <>
      {data?.map((column: any, index: string) => (
        <TaskColumn
          key={index}
          title={column.title}
          items={column.items}
        />
      ))}
      {data?.length ? (<AddColumn />) : null}
    </>
  );

  return (
    <PageLayout>
      <main className={`pt-6 pl-5 overflow-auto h-[calc(100svh-65px)] sm:h-[calc(100svh-81px)] md:h-[calc(100svh-89px)] ${isSideBarOpen ? "sm:w-[calc(100svw-250px)] md:w-[calc(100svw-300px)]" : "w-full"}`}>
        {data?.length ?
          (<div className="flex gap-6">
            {displayColumns(data)}
          </div>) :
          (<EmptyState />)
        }
      </main>
    </PageLayout>
  );
}
