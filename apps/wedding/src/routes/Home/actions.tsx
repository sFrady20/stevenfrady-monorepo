import React, { memo } from "react";
import { createEvent } from "ics";
import { saveAs } from "file-saver";

const event = createEvent({
  start: [2022, 9, 18, 15, 0],
  duration: { hours: 5, minutes: 30 },
  title: "Ariana & Steven's Wedding",
  location: "Mansion on Forsyth, 700 Drayton St, Savannah, GA 31401",
  geo: { lat: 32.0673266, lon: -81.095102 },
  busyStatus: "BUSY",
  organizer: { name: "Ariana", email: "acguy92@gmail.com" },
  url: "https://www.guyfradywedding.com",
});

const ActionsSection = memo(() => {
  return (
    <div className="flex w-full flex-row rounded-t border-width-1px divide-x-1 bg-gray-50 text-center <md:(flex-col divide-y-1)">
      <div className="flex-1">
        <div
          className="bg-gray-50 space-y-2 px-10 py-8 cursor-pointer group hover:bg-gray-100 transition transition-colors relative"
          onClick={() => {
            const blob = new Blob([event.value || ""], {
              type: "text/plain;charset=utf-8",
            });
            saveAs(blob, "guyFradyWeddingCalEvent.ics");
          }}
        >
          <div className="text-xl inline border-b-width-1px pb-1">When</div>
          <p className="text-lg leading-normal">
            Sunday, 18 September 2022
            <br />
            3:00PM to 8:30PM
          </p>
          <div className="bg-[rgba(20,20,20,0.8)] text-sm text-white absolute left-1/2 -top-8 rounded-md px-3 py-2 opacity-0 transform -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 transition-all group-hover:-top-10">
            Add to Calendar
          </div>
        </div>
      </div>
      <a
        target="_blank"
        rel="noreferrer nofollow"
        className="group flex-1"
        href="https://www.google.com/maps/place/Mansion+on+Forsyth+Park/@32.0673266,-81.095102,17z/data=!3m1!5s0x88fb9e6ae299308d:0xc2e1ee74bcf72450!4m18!1m9!3m8!1s0x88fb9e6b00fe6bf3:0xc89c03b17fd0602!2sMansion+on+Forsyth+Park!5m2!4m1!1i2!8m2!3d32.0670356!4d-81.0950798!3m7!1s0x88fb9e6b00fe6bf3:0xc89c03b17fd0602!5m2!4m1!1i2!8m2!3d32.0670356!4d-81.0950798"
      >
        <div className="bg-gray-50 space-y-2 px-10 py-8 group-hover:bg-gray-100 transition transition-colors relative box-border">
          <div className="text-xl inline border-b-width-1px pb-1">Where</div>
          <p className="text-lg leading-normal">
            Mansion on Forsyth Park
            <br />
            700 Drayton St, Savannah, GA 31401
          </p>
          <div className="bg-[rgba(20,20,20,0.8)] text-sm text-white absolute left-1/2 -top-8 rounded-md px-3 py-2 opacity-0 transform -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 transition-all group-hover:-top-10">
            View Map
          </div>
        </div>
      </a>
    </div>
  );
});

export default ActionsSection;
