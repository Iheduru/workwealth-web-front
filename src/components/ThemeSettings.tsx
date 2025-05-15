
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Switch } from "@/components/ui/switch";

const ThemeSettings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  
  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize the appearance of the application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="dark-mode" className="flex flex-col gap-1">
            <span>Dark Mode</span>
            <span className="font-normal text-sm text-muted-foreground">
              Switch between light and dark mode
            </span>
          </Label>
          <Switch
            id="dark-mode"
            checked={theme === "dark"}
            onCheckedChange={handleThemeChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeSettings;
