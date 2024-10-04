import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
type Props = {};

const SoftwareHardware = (props: Props) => {
  return (
    <div className="grid gap-6 duration-500 animate-in fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Software/Hardware Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Operating System
              </div>
              <div>macOS Ventura</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                CPU
              </div>
              <div>Apple M1 Pro</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                RAM
              </div>
              <div>16GB</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Storage
              </div>
              <div>512GB SSD</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Software
              </div>
              <ul className="space-y-1 text-sm">
                <li>Visual Studio Code</li>
                <li>Figma</li>
                <li>Slack</li>
                <li>Zoom</li>
              </ul>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Peripherals
              </div>
              <ul className="space-y-1 text-sm">
                <li>Logitech MX Master 3 Mouse</li>
                <li>Bose Noise Cancelling Headphones</li>
                <li>Wacom Intuos Pro Tablet</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SoftwareHardware;
