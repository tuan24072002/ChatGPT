import { Clipboard } from 'lucide-react';
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import copy from "copy-to-clipboard";
import { toast } from "sonner"

const MarkdownChat = ({ content }) => {
    const handleCopy = (text) => {
        copy(text);
        toast.success("Copied to clipboard;");
    }
    return (
        <ReactMarkdown
            components={{
                code({ className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return match ? (
                        <div className='flex flex-col'>
                            <button onClick={() => handleCopy(String(children).replace(/\n$/, ''))} className='p-2 rounded-md border hover:bg-gray-200 w-fit ml-auto group'>
                                <Clipboard className='w-4 h-4' />
                            </button>
                            <SyntaxHighlighter
                                language={match[1]}
                                style={dracula}
                                wrapLongLines
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        </div>
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    )
                },
            }}
        >{content}</ReactMarkdown>
    )
}

export default MarkdownChat