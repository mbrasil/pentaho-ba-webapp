import {css} from "@emotion/css";
import {theme} from "@hitachivantara/uikit-react-core";

export interface AnalyzerProps {
    url?: string;
}

const classes = {
    root: css({
        paddingTop: theme.space.md,
        display: "flex",
        flexDirection: "column",
        gap: theme.space.lg,
    }),
    fullHeight: css({
        height: "100%",
    }),
};

const Analyzer: React.FC<AnalyzerProps> = ({ url = "" }) => {

    return (
        <div className={classes.root + ' ' + classes.fullHeight}>
            <iframe className={classes.fullHeight} src={url}></iframe>
        </div>
    );
};

export default Analyzer;