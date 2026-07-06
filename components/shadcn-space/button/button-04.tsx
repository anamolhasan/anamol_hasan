import { Button } from "@/components/ui/button";
import "@/components/shadcn-space/button/button-04.css";

type Props = {
  downloadCv: string;
  downloadIcon: React.ReactNode;
  resumeLink: string;
};

const ButtonHeartbeatEffectDemo = ({
  downloadIcon,
  downloadCv,
  resumeLink,
}: Props) => {
  return (
    <>
      <a href={resumeLink} target="_blank" rel="noopener noreferrer">
        <Button
          variant="default"
          className="heartbeateffect cursor-pointer bg-emerald-100 hover:bg-emerald-300 text-green-600 shadow-lg shadow-emerald-500/30"
          style={{ "--heartbeat-color": "#10b981" } as React.CSSProperties}
        >
          {downloadIcon}
          {downloadCv}
        </Button>
      </a>
    </>
  );
};

export default ButtonHeartbeatEffectDemo;
