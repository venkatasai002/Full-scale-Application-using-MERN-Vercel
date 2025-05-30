import { cn } from "../../utils/cn";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        "group relative inline-flex h-10 items-center justify-center rounded-full bg-neutral-950 px-4 pr-10 text-sm font-medium text-neutral-50",
        className,
      )}
      {...props}
    >
      <span className="z-10 pr-1">{children}</span>
      <div className="absolute right-1 inline-flex h-8 w-8 items-center justify-end rounded-full bg-neutral-500 transition-[width] group-hover:w-[calc(100%-4px)]">
        <div className="mr-2 flex items-center justify-center">
          <svg
            width="13"
            height="13"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-neutral-50"
          >
            <path
              d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
    </button>
  );
};
