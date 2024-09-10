'use client';

import { handleDeleteButtonClicked, navigate } from '@/app/actions';

const DeleteEmailButton = ({ userId }: { userId: string }) => {
    return (
        <div className="flex items-center justify-between p-2 group mr-10 right-0 absolute">
            <button
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 font-semibold rounded-lg px-5 py-2.5 me-2 mb-2"
                onClick={async () => {
                    // await deleteEmail(userId);
                    await handleDeleteButtonClicked(userId);
                    navigate(`/deleted?userId=${userId}`);
                }}
            >
                delete my email from server
            </button>
        </div>
    );
};

export default DeleteEmailButton;
