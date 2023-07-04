import { forwardRef, Children, CSSProperties, ReactNode } from "react";

interface Props {
    children?: ReactNode;
    style: CSSProperties;
    className: string;
    'aria-labelledby': string;
}

export const CustomMenu = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { children, style, className, 'aria-labelledby': labeledBy } = props;

    return (
        <div
            ref={ref}
            style={style}
            className={className}
            aria-labelledby={labeledBy}
        >
            <div className="custom-dropdown">
                {Children.toArray(children)}
            </div>
        </div>
    );
});
CustomMenu.displayName = "CustomMenu";