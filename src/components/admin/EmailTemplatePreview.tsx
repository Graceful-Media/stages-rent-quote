
import { FC } from "react";

interface EmailTemplatePreviewProps {
  name: string;
  subject: string;
  content: string;
}

const EmailTemplatePreview: FC<EmailTemplatePreviewProps> = ({
  name,
  subject,
  content,
}) => {
  return (
    <div className="border rounded-lg p-6 bg-white space-y-4">
      <div className="space-y-1">
        <p className="text-sm text-gray-500">Template Name:</p>
        <p className="font-medium">{name}</p>
      </div>
      <div className="space-y-1">
        <p className="text-sm text-gray-500">Subject:</p>
        <p className="font-medium">{subject}</p>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-500">Preview:</p>
        <div className="border rounded p-4 min-h-[200px] prose prose-sm max-w-none">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  );
};

export default EmailTemplatePreview;
