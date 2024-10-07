import { useState } from 'react';
import { Button } from '~/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip';
import { Copy, ExternalLinkIcon } from 'lucide-react';

interface InlineLinkCopyProps {
  href: string;
  displayText: string;
}

export default function InlineLinkCopy(
  { href, displayText }: InlineLinkCopyProps = {
    href: 'https://example.com',
    displayText: 'Example Link',
  }
) {
  const [copied, setCopied] = useState(false);

  const openLink = () => {
    window.open(href, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <span className="inline-flex items-center space-x-2">
      <a
        href={href}
        className="text-primary underline hover:underline-offset-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        {displayText}
      </a>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 p-0"
              onClick={openLink}
              aria-label="Open link"
            >
              <ExternalLinkIcon className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Open document in origin space</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <TooltipProvider>
              <Tooltip open={copied}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 p-0"
                    onClick={copyToClipboard}
                    aria-label="Copy link"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copied!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy link document in origin space</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </span>
  );
}
