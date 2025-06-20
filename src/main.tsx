import parse from "html-react-parser";

export const fetchCache = "force-cache";

async function fetchIconSvg(link: string): Promise<string | null> {
  try {
    const res = await fetch(link, {
      cache: "force-cache",
    });

    if (!res.ok) {
      console.error(`Icon not found at ${link}`);
      return null;
    }
    return await res.text();
  } catch (error) {
    console.error(`Fetch error ${link}`, error);
    return null;
  }
}

function transformIcon(
  svg: string,
  {
    removeDimensions,
    height,
    width,
    className,
  }: {
    removeDimensions?: boolean;
    height?: number | string;
    width?: number | string;
    className?: string;
  }
): string {
  let transformed = svg;

  if (removeDimensions) {
    transformed = transformed.replace(/\s(width|height)="[^"]*"/g, "");
  }

  if (height !== undefined) {
    transformed = transformed
      .replace(/\sheight="[^"]*"/, "")
      .replace("<svg", `<svg height="${height}"`);
  }

  if (width !== undefined) {
    transformed = transformed
      .replace(/\swidth="[^"]*"/, "")
      .replace("<svg", `<svg width="${width}"`);
  }

  if (className) {
    transformed = transformed.replace("<svg", `<svg className="${className}"`);
  }

  return transformed;
}

type Props = {
  icon: string;
  className?: string;
  removeDimensions?: boolean;
  host?: string;
  height?: number | string;
  width?: number | string;
};

async function StaticIconifyIcon({
  icon,
  className,
  removeDimensions,
  host = "https://api.iconify.design",
  height,
  width,
}: Props) {
  const rawSvg = await fetchIconSvg(`${host}/${icon}.svg`);
  if (!rawSvg) return null;

  const svg = transformIcon(rawSvg, {
    removeDimensions,
    className,
    height,
    width,
  });

  return <>{parse(svg)}</>;
}

export { StaticIconifyIcon as default, StaticIconifyIcon, transformIcon, fetchIconSvg };
