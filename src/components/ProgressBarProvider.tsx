import { useRouterState } from "@tanstack/react-router";
import NProgress from "nprogress";
import type React from "react";
import { useEffect } from "react";

const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
	const isLoading = useRouterState({
		select: (state) => state.isLoading,
	});

	useEffect(() => {
		NProgress.configure({ showSpinner: false });
	}, []);

	useEffect(() => {
		if (isLoading) {
			NProgress.start();
		} else {
			NProgress.done();
		}
	}, [isLoading]);

	return <>{children}</>;
};

export default ProgressBarProvider;
