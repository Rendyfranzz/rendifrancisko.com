import { useEffect, useState } from "react";
import { LuList, LuX } from "react-icons/lu";

interface Heading {
	id: string;
	text: string;
	level: number;
}

interface TableOfContentsProps {
	headings: Heading[];
}

export const TableOfContents = ({ headings }: TableOfContentsProps) => {
	const [activeId, setActiveId] = useState<string>("");
	const [isVisible, setIsVisible] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				});
			},
			{
				rootMargin: "-80px 0px -60% 0px",
				threshold: 0,
			},
		);

		headings.forEach((heading) => {
			const element = document.getElementById(heading.id);
			if (element) {
				observer.observe(element);
			}
		});

		return () => {
			observer.disconnect();
		};
	}, [headings]);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 200) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToHeading = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			const offset = 80;
			const elementPosition = element.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.scrollY - offset;
			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
			setActiveId(id);
			setIsOpen(false);
		}
	};

	const closeDrawer = () => setIsOpen(false);

	if (headings.length === 0) return null;

	return (
		<>
			<aside
				className={`
          fixed top-24 right-6 z-40 hidden xl:block w-64
          transition-all duration-500 ease-in-out transform
          ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"}
        `}
			>
				<div className="sticky top-24">
					<div className="relative">
						<div className="absolute -left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500/50 to-primary-500/10 rounded-full" />
						<h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 pl-2">
							On this page
						</h4>
						<nav className="space-y-1">
							{headings.map((heading) => (
								<button
									key={heading.id}
									type="button"
									onClick={() => scrollToHeading(heading.id)}
									className={`
                    block w-full text-left pl-3 py-1.5 text-sm transition-all duration-200 border-l-2
                    ${
											activeId === heading.id
												? "border-primary-500 text-foreground font-medium"
												: "border-transparent text-muted-foreground hover:text-foreground hover:border-primary-500/30"
										}
                    ${heading.level === 3 ? "ml-3" : ""}
                  `}
								>
									{heading.text}
								</button>
							))}
						</nav>
					</div>
				</div>
			</aside>

			<button
				type="button"
				onClick={() => setIsOpen(true)}
				className={`
          fixed bottom-6 right-6 z-50 xl:hidden
          w-12 h-12 rounded-full bg-foreground text-background
          shadow-lg flex items-center justify-center
          transition-all duration-500 ease-in-out transform
          ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}
        `}
				aria-label="Table of Contents"
			>
				<LuList className="w-5 h-5" />
			</button>

			<div
				className={`
          fixed inset-0 z-50 xl:hidden
          transition-all duration-300 ease-in-out
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
			>
				<button
					type="button"
					aria-label="Close table of contents"
					className="absolute inset-0 bg-black/50 backdrop-blur-sm"
					onClick={closeDrawer}
				/>
				<div
					className={`
            absolute bottom-0 left-0 right-0 bg-background rounded-t-2xl p-6
            shadow-xl transform transition-transform duration-300 ease-out
            ${isOpen ? "translate-y-0" : "translate-y-full"}
          `}
				>
					<div className="flex items-center justify-between mb-4">
						<h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
							On this page
						</h4>
						<button
							type="button"
							onClick={closeDrawer}
							className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
							aria-label="Close"
						>
							<LuX className="w-4 h-4" />
						</button>
					</div>
					<nav className="space-y-2 max-h-[60vh] overflow-y-auto pb-4">
						{headings.map((heading) => (
							<button
								key={heading.id}
								type="button"
								onClick={() => scrollToHeading(heading.id)}
								className={`
                  block w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200
                  ${
										activeId === heading.id
											? "bg-primary-500/10 text-primary-500 font-medium"
											: "text-muted-foreground hover:text-foreground hover:bg-muted"
									}
                  ${heading.level === 3 ? "pl-6" : ""}
                `}
							>
								{heading.text}
							</button>
						))}
					</nav>
				</div>
			</div>
		</>
	);
};
