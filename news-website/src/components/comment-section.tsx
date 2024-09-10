'use client';

import { handleSubmitComment } from '@/app/actions';
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card';
import { MutableRefObject, forwardRef, useRef, useState } from 'react';
import { Comment } from '../../db/schema';

type CommentSectionProps = {
    userId: string;
    url: string;
    comments: Comment[];
};

// Define the component using forwardRef
const CommentSection = forwardRef<HTMLButtonElement, CommentSectionProps>(({ userId, url, comments }, ref) => {
    const [formData, setFormData] = useState({
        // email: '',
        name: '',
        comment: '',
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { name, comment } = formData;
        if (!name || !comment) return;
        await handleSubmitComment(userId, url, name, comment);
        setFormData({ name: '', comment: '' });
    };

    return (
        <Card className="bg-slate-100 mb-14 w-3/4">
            <CardHeader>
                <CardTitle className="text-4xl font-bold text-slate-800 font-serif">Comments</CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit}>
                    {/* <h2 className="text-lg text-slate-800">Add a comment</h2> */}
                    <div className="flex items-start justify-start mt-2">
                        <input
                            name="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            type="text"
                            placeholder="Name"
                            className="border-2 border-gray-300 p-2 w-1/2"
                            required
                        />
                        {/* <input
                            name="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            type="email"
                            placeholder="Email"
                            className="border-2 border-gray-300 p-2 ml-5 w-1/2"
                            required
                        /> */}
                    </div>
                    <textarea
                        name="comment"
                        value={formData.comment}
                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                        maxLength={250}
                        placeholder="Your comment..."
                        className="border-2 border-gray-300 w-full mt-4 h-20 p-1"
                        required
                    />
                    <div className="text-gray-400 text-sm">max. 250 characters</div>
                    <button
                        ref={ref}
                        id="submit"
                        type="submit"
                        className="bg-green-700 text-white p-2 mt-2 hover:bg-green-500 rounded-sm"
                    >
                        Submit
                    </button>
                </form>
            </CardContent>
            {comments.length > 0 && (
                <div className="flex flex-col items-center">
                    {comments.map((comment) => (
                        <Card className="w-11/12 bg-slate-50 mb-3" key={comment.id}>
                            {/* <CardHeader className="pb-0 pt-4 text-sm">
                                <CardTitle className="text-xl font-bold text-slate-800 font-serif mb-0">
                                {comment.name}
                                </CardTitle>
                            </CardHeader> */}
                            <CardContent className="pt-4 pb-2">from: {comment.name}</CardContent>
                            <CardContent className="pb-4">
                                <p className="text-slate-700 font-light">{comment.comment}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </Card>
    );
});
CommentSection.displayName = 'CommentSection';

export default CommentSection;
