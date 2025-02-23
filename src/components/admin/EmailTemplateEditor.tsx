
import { FC, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import EmailTemplatePreview from "./EmailTemplatePreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EmailTemplateEditorProps {
  templateId?: string;
  initialData?: {
    name: string;
    subject: string;
    content: string;
    description?: string;
  };
  onSave?: () => void;
}

const EmailTemplateEditor: FC<EmailTemplateEditorProps> = ({
  templateId,
  initialData,
  onSave,
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [subject, setSubject] = useState(initialData?.subject || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("edit");

  const editor = useEditor({
    extensions: [StarterKit],
    content: initialData?.content || "",
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[400px]",
      },
    },
  });

  const handleSave = async () => {
    if (!editor || !name || !subject) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSaving(true);
    try {
      const content = editor.getHTML();
      
      if (templateId) {
        // Update existing template
        const { error: templateError } = await supabase
          .from("email_templates")
          .update({
            name,
            subject,
            description,
          })
          .eq("id", templateId);

        if (templateError) throw templateError;

        const { error: versionError } = await supabase
          .from("template_versions")
          .insert({
            template_id: templateId,
            content,
            version_number: 1,
            is_active: true,
          });

        if (versionError) throw versionError;
      } else {
        // Create new template
        const { data: template, error: templateError } = await supabase
          .from("email_templates")
          .insert({
            name,
            subject,
            description,
            status: "draft",
          })
          .select()
          .single();

        if (templateError) throw templateError;

        const { error: versionError } = await supabase
          .from("template_versions")
          .insert({
            template_id: template.id,
            content,
            version_number: 1,
            is_active: true,
          });

        if (versionError) throw versionError;
      }

      toast.success("Template saved successfully");
      onSave?.();
    } catch (error) {
      console.error("Error saving template:", error);
      toast.error("Failed to save template");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Template Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter template name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Email Subject</Label>
        <Input
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter email subject"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter template description"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="edit" className="border rounded-lg p-4">
          <EditorContent editor={editor} />
        </TabsContent>
        <TabsContent value="preview">
          <EmailTemplatePreview
            name={name}
            subject={subject}
            content={editor?.getHTML() || ""}
          />
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => editor?.commands.clearContent()}>
          Clear Content
        </Button>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Template"}
        </Button>
      </div>
    </div>
  );
};

export default EmailTemplateEditor;
