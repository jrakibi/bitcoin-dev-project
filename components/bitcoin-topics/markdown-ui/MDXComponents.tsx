import TOCInline from "pliny/ui/TOCInline"
import BlogNewsletterForm from "pliny/ui/BlogNewsletterForm"
import type { MDXComponents } from "mdx/types"
import CustomLink from "../markdown-ui/Link"
import Image from "../markdown-ui/Image"
import SvgDisplay from "./script-visualizer/SvgDisplay"
import ScriptStackVisualizer from "./script-visualizer/scriptVisualizer"
import TransactionsDisplay from "./transaction-serializer/TransactionDisplay"
import CodeEditor from "./CodeEditor"
import { QuickLink, QuickLinks } from "./QuickLinks"
import Hint from "./Hints"
import MinimalVideoPlayer from "./minimal-video-player"
import ScriptDecoder from "./script-decoder"
import ExpandableAlert from "./expandable-alert"
import P2SHEncoder from "./address-encoder"
import OpcodeDataVisualizer from "./opcode-data-visualizer"
import OpCodeExplorer from "./opcode-explorer"
import MultisigAnimation from "./multisig-animation"
import SandpackComponent from "./sandpack"
import Quiz from "./Quiz"
import P2MSDecompile from "./p2ms-decompile"

export const components: MDXComponents = {
    Image,
    CustomLink,
    TOCInline,
    BlogNewsletterForm,
    ScriptStackVisualizer,
    SvgDisplay,
    CodeEditor,
    TransactionsDisplay,
    QuickLinks,
    QuickLink,
    Hint,
    MinimalVideoPlayer,
    ScriptDecoder,
    ExpandableAlert,
    P2SHEncoder,
    OpcodeDataVisualizer,
    OpCodeExplorer,
    MultisigAnimation,
    SandpackComponent,
    Quiz,
    P2MSDecompile
}
