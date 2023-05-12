import { extendTheme } from "@chakra-ui/react";
import { withProse } from "@nikolovlazar/chakra-ui-prose";

const theme = extendTheme(
	{
		styles: {
			global: {},
		},
	},
	withProse({
		baseStyle: {
			".ProseMirror": {
				p: 4,
				m: 0,
				bg: "none",
				outline: "none",
				h1: {
					p: 0,
					m: 0,
					fontSize: "3xl",
					fontWeight: "bold",
				},
				h2: {
					p: 0,
					m: 0,
					fontSize: "2xl",
					fontWeight: "bold",
				},
				h3: {
					p: 0,
					m: 0,
					fontSize: "lg",
					fontWeight: "bold",
				},
				h4: {
					p: 0,
					m: 0,
					fontSize: "md",
					fontWeight: "bold",
				},
				h5: {
					p: 0,
					m: 0,
					fontSize: "sm",
					fontWeight: "bold",
				},
				h6: {
					p: 0,
					m: 0,
					fontSize: "xs",
					fontWeight: "bold",
				},
				code: {
					p: 1,
					bg: "gray.100",
					color: "gray.600",
					fontSize: "xs",
					boxDecorationBreak: "none",
					borderRadius: "md",
				},
			},
		},
	})
);

export default theme;
