import { useEffect, ReactNode } from "react";

type PageProps = {
    title: string;
    children: ReactNode;
}

export const Page = (props: PageProps) => {
    useEffect(() => {
        document.title = props.title;
    })
    return props.children;
}
