import parse from "html-react-parser";

export const fetchCache = "force-cache";

type Props = {
  icon: string;
  className?: string;
  removeDimensions?: boolean;
  host?: string;
};

export default async function StaticIconifyIcon({
  icon,
  className,
  removeDimensions,
  host = "https://api.iconify.design",
}: Props) {
  try {
    const res = await fetch(`${host}/${icon}.svg`, {
      cache: "force-cache",
    });

    if (!res.ok) {
      console.error(`${icon} not found at ${host}`);
      return null;
    }

    let svg = await res.text();
    if (removeDimensions) {
      svg = svg.replace(/\s(width|height)="[^"]+"/g, ``);
    }
    const cleanedSvg = svg.replace(
      "<svg",
      `<svg className="${className || ""}"`
    );

    return <>{parse(cleanedSvg)}</>;
  } catch (error) {
    console.error(`Fetch error at ${host}`);
  }
}
