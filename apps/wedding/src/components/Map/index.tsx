import React, { HTMLProps, memo, useEffect, useRef } from "react";
import googlemaps from "~/services/googlemaps";

const Map = memo((props: HTMLProps<HTMLDivElement>) => {
  const { ...rest } = props;

  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!el.current) return;
    let map: typeof window.google.maps.Map;

    (async () => {
      await googlemaps;

      if (el.current) {
        //@ts-ignore
        map = new window.google.maps.Map(el.current, {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
          mapId: "45fee0d64bb7627a",
        });
      }
    })();

    return () => {};
  }, [el.current]);

  return <div {...rest} ref={el}></div>;
});

export default Map;
