declare module "react-window-infinite-loader" {
  import { ComponentType, ReactNode } from "react";

  interface InfiniteLoaderProps {
    isItemLoaded: (index: number) => boolean;
    itemCount: number;
    loadMoreItems: () => Promise<void>;
    threshold?: number;
    minimumBatchSize?: number;
    children: (props: {
      onItemsRendered: (props: {
        visibleStartIndex: number;
        visibleStopIndex: number;
        overscanStartIndex: number;
        overscanStopIndex: number;
      }) => void;
      ref: any;
    }) => ReactNode;
  }

  declare const InfiniteLoader: ComponentType<InfiniteLoaderProps>;
  export default InfiniteLoader;
}
