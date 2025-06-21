import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Palette, Type, Download, RotateCw, Settings } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';

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
    animation: true,
    theme: 'light',
    axisLabelRotation: 0,
    chartOpacity: 1,
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    borderWidth: 1
  });

  const colors = [
    '#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1',
    '#d084d0', '#ffb347', '#87ceeb', '#dda0dd', '#98fb98',
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'
  ];

  const fonts = ['Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana', 'Courier New', 'Impact'];

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
        {/* Primary Color */}
        <div>
          <Label className="text-sm font-medium">Primary Color</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {colors.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                  chartStyle.color === color ? 'border-primary ring-2 ring-primary/20' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleStyleChange('color', color)}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Font Family */}
        <div>
          <Label htmlFor="font-family">Font Family</Label>
          <Select value={chartStyle.fontFamily} onValueChange={(value) => handleStyleChange('fontFamily', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fonts.map((font) => (
                <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Font Size */}
        <div>
          <Label htmlFor="font-size">Font Size: {chartStyle.fontSize}px</Label>
          <Slider
            value={[parseInt(chartStyle.fontSize)]}
            onValueChange={(value) => handleStyleChange('fontSize', value[0].toString())}
            max={24}
            min={8}
            step={1}
            className="mt-2"
          />
        </div>

        {/* Chart Opacity */}
        <div>
          <Label>Chart Opacity: {Math.round(chartStyle.chartOpacity * 100)}%</Label>
          <Slider
            value={[chartStyle.chartOpacity]}
            onValueChange={(value) => handleStyleChange('chartOpacity', value[0])}
            max={1}
            min={0.3}
            step={0.1}
            className="mt-2"
          />
        </div>

        {/* Axis Label Rotation */}
        <div>
          <Label>Axis Label Rotation: {chartStyle.axisLabelRotation}°</Label>
          <Slider
            value={[chartStyle.axisLabelRotation]}
            onValueChange={(value) => handleStyleChange('axisLabelRotation', value[0])}
            max={90}
            min={-90}
            step={15}
            className="mt-2"
          />
        </div>

        {/* Background Color */}
        <div>
          <Label className="text-sm font-medium">Background Color</Label>
          <div className="flex gap-2 mt-2">
            {['#ffffff', '#f8fafc', '#f1f5f9', '#e2e8f0', '#1e293b', '#0f172a'].map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                  chartStyle.backgroundColor === color ? 'border-primary ring-2 ring-primary/20' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleStyleChange('backgroundColor', color)}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Border Styling */}
        <div>
          <Label className="text-sm font-medium">Border Color</Label>
          <div className="flex gap-2 mt-2">
            {['#e5e7eb', '#d1d5db', '#9ca3af', '#6b7280', '#374151', '#1f2937'].map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                  chartStyle.borderColor === color ? 'border-primary ring-2 ring-primary/20' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleStyleChange('borderColor', color)}
                title={color}
              />
            ))}
          </div>
        </div>

        <div>
          <Label>Border Width: {chartStyle.borderWidth}px</Label>
          <Slider
            value={[chartStyle.borderWidth]}
            onValueChange={(value) => handleStyleChange('borderWidth', value[0])}
            max={5}
            min={0}
            step={1}
            className="mt-2"
          />
        </div>

        {/* Toggle Options */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="show-grid" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Show Grid Lines
            </Label>
            <Switch
              id="show-grid"
              checked={showGrid}
              onCheckedChange={onShowGridChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="show-legend" className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              Show Legend
            </Label>
            <Switch
              id="show-legend"
              checked={showLegend}
              onCheckedChange={onShowLegendChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="enable-animation" className="flex items-center gap-2">
              <RotateCw className="w-4 h-4" />
              Enable Animation
            </Label>
            <Switch
              id="enable-animation"
              checked={enableAnimation}
              onCheckedChange={onEnableAnimationChange}
            />
          </div>
        </div>

        {/* Export Options */}
        <div className="pt-4 space-y-2">
          <Label className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Options
          </Label>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport('png')}
              className="flex-1"
            >
              PNG
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport('pdf')}
              className="flex-1"
            >
              PDF
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartCustomization;
