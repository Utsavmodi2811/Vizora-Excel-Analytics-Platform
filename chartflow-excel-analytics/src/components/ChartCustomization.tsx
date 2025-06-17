import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Palette, Type, Download } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface ChartCustomizationProps {
  onStyleChange: (style: any) => void;
  onExport: (format: string) => void;
  showGrid: boolean;
  showLegend: boolean;
  enableAnimation: boolean;
  onShowGridChange: (value: boolean) => void;
  onShowLegendChange: (value: boolean) => void;
  onEnableAnimationChange: (value: boolean) => void;
}

const ChartCustomization: React.FC<ChartCustomizationProps> = ({
  onStyleChange,
  onExport,
  showGrid,
  showLegend,
  enableAnimation,
  onShowGridChange,
  onShowLegendChange,
  onEnableAnimationChange
}) => {
  const [chartStyle, setChartStyle] = React.useState({
    color: '#8884d8',
    fontSize: '12',
    fontFamily: 'Arial',
    gridLines: true,
    legend: true,
    animation: true
  });

  const colors = [
    '#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1',
    '#d084d0', '#ffb347', '#87ceeb', '#dda0dd', '#98fb98'
  ];

  const fonts = ['Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana'];

  const handleStyleChange = (key: string, value: any) => {
    const newStyle = { ...chartStyle, [key]: value };
    setChartStyle(newStyle);
    onStyleChange(newStyle);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Customize Chart Style
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm font-medium">Primary Color</Label>
          <div className="flex gap-2 mt-2">
            {colors.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full border-2 ${
                  chartStyle.color === color ? 'border-primary' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleStyleChange('color', color)}
              />
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="font-family">Font Family</Label>
          <Select value={chartStyle.fontFamily} onValueChange={(value) => handleStyleChange('fontFamily', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fonts.map((font) => (
                <SelectItem key={font} value={font}>{font}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="font-size">Font Size</Label>
          <Input
            id="font-size"
            type="number"
            value={chartStyle.fontSize}
            onChange={(e) => handleStyleChange('fontSize', e.target.value)}
            min="8"
            max="24"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="show-grid">Show Grid Lines</Label>
            <Switch
              id="show-grid"
              checked={showGrid}
              onCheckedChange={onShowGridChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="show-legend">Show Legend</Label>
            <Switch
              id="show-legend"
              checked={showLegend}
              onCheckedChange={onShowLegendChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="enable-animation">Enable Animation</Label>
            <Switch
              id="enable-animation"
              checked={enableAnimation}
              onCheckedChange={onEnableAnimationChange}
            />
          </div>
        </div>

        <div className="pt-4 space-y-2">
          <Label>Export Options</Label>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport('png')}
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              PNG
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport('pdf')}
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartCustomization;
