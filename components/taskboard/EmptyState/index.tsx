import { Button } from "@components/common";

const EmptyState = () => {
    return (
        <div className="w-full h-[80%] flex items-center flex-col justify-center">
            <p className="text-lg text-gray-828FA3 text-center leading-[23px]">This board is empty. Create a new column to get started.</p>
            <Button variant="primary" size="large" className="mt-8">
                + Add New Column
            </Button>
        </div>
    );
}

export default EmptyState;