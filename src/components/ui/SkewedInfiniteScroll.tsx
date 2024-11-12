export const SkewedInfiniteScroll = ({ children }: any) => {
  return (
    <div>
      <div className="flex items-center justify-center ">
        <div
          className="relative overflow-hidden"
          style={{
            maskComposite: "intersect",
            maskImage: `
          linear-gradient(to right,  transparent, black 3rem),
          linear-gradient(to left,   transparent, black 3rem),
          linear-gradient(to bottom, transparent, black 3rem),
          linear-gradient(to top,    transparent, black 3rem)
        `,
          }}
        >
          <div className="mx-auto grid h-[300px] animate-skew-scroll grid-cols-1 gap-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
