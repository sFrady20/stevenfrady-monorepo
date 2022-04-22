import React, { memo } from "react";

import AirBnbLogo from "./lockups/airbnb.svg";
import VrboLogo from "./lockups/vrbo.svg";
import TripAdvisorLogo from "./lockups/tripadvisor.svg";
import BookingLogo from "./lockups/booking.svg";
import ExpediaLogo from "./lockups/expedia.svg";

const LodgingCard = memo(
  (props: { link: string; name: string; imgUrl: string; reason?: string }) => {
    const { link, name, reason, imgUrl } = props;

    return (
      <a href={link} target="_blank">
        <div className="p-10 transition-all space-x-6 flex rounded-sm group-hover:(opacity-30) hover:(bg-gray-100 !opacity-100) <sm:(px-5)">
          <div className="w-2/5">
            <img className="rounded-sm" src={imgUrl} />
          </div>
          <div className="flex-1">
            <h5 className="leading-snug text-18px">{name}</h5>
            {reason && <p className="italic text-sm mt-1">{reason}</p>}
          </div>
        </div>
      </a>
    );
  }
);

const ResourceLink = memo((props: { Svg: string; link: string }) => {
  const { link, Svg } = props;

  return (
    <a href={link} target="_blank">
      <div className="py-4 transition-all svg:(h-32px w-full) group-hover:(opacity-50) hover:(bg-gray-100 !opacity-100) ">
        <Svg />
      </div>
    </a>
  );
});

const LodgingSection = memo(() => {
  return (
    <div className="bg-gray-50 w-full relative p-15 <md:(px-10) <sm:(px-0)">
      <div className="text-center pb-10">
        <h3 className="text-size-44px pb-10 border-b-1px inline-block">
          Where to Stay
        </h3>
      </div>

      <div className="flex items-start <lg:(flex-col)">
        <div className="flex-1">
          <div className="px-10 mb-4 <sm:(px-5)">
            <p className="py-4 border-b-1px inline-block">
              Hotel recommendations
            </p>
          </div>
          <div className="group divide-y">
            <div>
              <LodgingCard
                link="https://www.tripadvisor.com/Hotel_Review-g60814-d86784-Reviews-Planters_Inn-Savannah_Georgia.html"
                name="Planters Inn"
                imgUrl="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/d4/09/46/planters-inn.jpg?w=600&h=-1&s=1"
                reason="Closest"
              />
            </div>
            <div>
              <LodgingCard
                link="https://www.tripadvisor.com/Hotel_Review-g60814-d86782-Reviews-The_Marshall_House-Savannah_Georgia.html"
                name="The DeSoto"
                imgUrl="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/61/24/e0/exterior-view.jpg?w=600&h=-1&s=1"
                reason="Popular"
              />
            </div>
            <div>
              <LodgingCard
                link="https://www.tripadvisor.com/Hotel_Review-g60814-d86782-Reviews-The_Marshall_House-Savannah_Georgia.html"
                name="The Marshall House"
                imgUrl="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/8c/e3/de/the-marshall-house-hotel.jpg?w=600&h=-1&s=1"
                reason="Historic"
              />
            </div>
          </div>
        </div>
        <div className="flex-1 <sm:(w-full)">
          <div className="p-10 flex flex-col items-center <lg:(flex-row space-x-10 px-0 items-start) <sm:(flex-col space-x-0 px-5 items-center)">
            <div className=" <sm:(flex-col w-full)">
              <p className="max-w-300px text-left text-16px leading-relaxed opacity-90 mb-32px italic px-5">
                Rent a historic home for the weekend
              </p>

              <div className="divide-y border-1px rounded-xl text-center group w-full mb-40px">
                <div>
                  <ResourceLink
                    link="https://www.airbnb.com/s/Savannah--Georgia--United-States/homes?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&flexible_trip_dates%5B%5D=june&flexible_trip_dates%5B%5D=may&flexible_trip_lengths%5B%5D=weekend_trip&date_picker_type=calendar&checkin=2022-09-17&checkout=2022-09-18&adults=2&query=Savannah%2C%20Georgia%2C%20United%20States&place_id=ChIJWQbyePx1-4gRvCBgA1FnDE4&source=structured_search_input_header&search_type=autocomplete_click"
                    Svg={AirBnbLogo}
                  />
                </div>
                <div>
                  <ResourceLink
                    link="https://www.vrbo.com/search/keywords:savannah-georgia-united-states-of-america/arrival:2022-09-17/departure:2022-09-18/@32.04123313367821,-81.14023732057825,32.089384800203995,-81.05243252626673,14z/minNightlyPrice/0?filterByTotalPrice=true&petIncluded=false&ssr=true&adultsCount=2"
                    Svg={VrboLogo}
                  />
                </div>
              </div>
            </div>

            <div className=" <sm:(flex-col w-full)">
              <p className="max-w-300px text-left text-16px leading-relaxed opacity-90 mb-32px italic px-5">
                or search on one of these sites for more hotel options
              </p>

              <div className="divide-y border-1px rounded-xl text-center group w-full">
                <div>
                  <ResourceLink
                    link="https://www.expedia.com/Hotel-Search?adults=2&d1=2022-09-17&d2=2022-09-18&destination=Savannah%2C%20Georgia%2C%20United%20States%20of%20America&directFlights=false&endDate=2022-09-18&guestRating=&hotelName=&latLong=32.0746%2C-81.09115&localDateFormat=M%2Fd%2Fyyyy&neighborhood=6034190&partialStay=false&poi=32.067504%2C-81.096254%3A6091273&regionId=6034190&semdtl=&sort=RECOMMENDED&startDate=2022-09-17&theme=&useRewards=false&userIntent="
                    Svg={ExpediaLogo}
                  />
                </div>
                <div>
                  <ResourceLink
                    link="https://www.tripadvisor.com/HotelsNear-g60814-d522605-Mansion_on_Forsyth_Park-Savannah_Georgia.html"
                    Svg={TripAdvisorLogo}
                  />
                </div>
                <div>
                  <ResourceLink
                    link="https://www.booking.com/searchresults.html?label=gen173nr-1DCAEoggI46AdIM1gEaLICiAEBmAExuAEXyAEM2AED6AEB-AECiAIBqAIDuAKcr4eTBsACAdICJGRlZThlNTQzLTExZmQtNGUxOS05MDQzLTkzNGE1YzI2YjA0Y9gCBOACAQ&sid=2728117a8a9cbdd465bc9deab88e67f7&sb=1&sb_lp=1&src=index&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Findex.html%3Flabel%3Dgen173nr-1DCAEoggI46AdIM1gEaLICiAEBmAExuAEXyAEM2AED6AEB-AECiAIBqAIDuAKcr4eTBsACAdICJGRlZThlNTQzLTExZmQtNGUxOS05MDQzLTkzNGE1YzI2YjA0Y9gCBOACAQ%26sid%3D2728117a8a9cbdd465bc9deab88e67f7%26sb_price_type%3Dtotal%26%26&ss=Savannah&is_ski_area=0&ssne=Savannah&ssne_untouched=Savannah&dest_id=20029490&dest_type=city&checkin_year=2022&checkin_month=9&checkin_monthday=17&checkout_year=2022&checkout_month=9&checkout_monthday=18&group_adults=2&group_children=0&no_rooms=1&b_h4u_keep_filters=&from_sf=1"
                    Svg={BookingLogo}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default LodgingSection;
