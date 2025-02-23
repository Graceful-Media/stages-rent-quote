
import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";

interface TemplateVersion {
  id: string;
  version_number: number;
  content: string;
  created_at: string;
  is_active: boolean;
}

interface TemplateVersionsProps {
  templateId: string;
  onVersionSelect: (content: string) => void;
}

const TemplateVersions: FC<TemplateVersionsProps> = ({ templateId, onVersionSelect }) => {
  const [versions, setVersions] = useState<TemplateVersion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadVersions = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("template_versions")
        .select("*")
        .eq("template_id", templateId)
        .order("version_number", { ascending: false });

      if (error) throw error;
      setVersions(data || []);
    } catch (error) {
      console.error("Error loading versions:", error);
      toast.error("Failed to load template versions");
    } finally {
      setIsLoading(false);
    }
  };

  const setActiveVersion = async (versionId: string) => {
    try {
      // First, set all versions to inactive
      await supabase
        .from("template_versions")
        .update({ is_active: false })
        .eq("template_id", templateId);

      // Then set the selected version to active
      const { error } = await supabase
        .from("template_versions")
        .update({ is_active: true })
        .eq("id", versionId);

      if (error) throw error;

      // Update local state
      const selectedVersion = versions.find(v => v.id === versionId);
      if (selectedVersion) {
        onVersionSelect(selectedVersion.content);
      }

      toast.success("Version activated successfully");
      loadVersions();
    } catch (error) {
      console.error("Error setting active version:", error);
      toast.error("Failed to set active version");
    }
  };

  return (
    <Dialog onOpenChange={(open) => open && loadVersions()}>
      <DialogTrigger asChild>
        <Button variant="outline">Version History</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Template Versions</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] mt-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {versions.map((version) => (
                <div
                  key={version.id}
                  className={`p-4 border rounded-lg ${
                    version.is_active ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium">
                        Version {version.version_number}
                        {version.is_active && (
                          <span className="ml-2 text-sm text-primary">(Active)</span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Created {format(new Date(version.created_at), "PPpp")}
                      </p>
                    </div>
                    {!version.is_active && (
                      <Button
                        size="sm"
                        onClick={() => setActiveVersion(version.id)}
                      >
                        Set Active
                      </Button>
                    )}
                  </div>
                  <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                    <div dangerouslySetInnerHTML={{ __html: version.content }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateVersions;
