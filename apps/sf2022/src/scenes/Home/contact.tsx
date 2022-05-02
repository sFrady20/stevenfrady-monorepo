const ContactSection = () => {
  return (
    <section>
      <div className="grid grid-cols-8 p-10">
        <div className="col-span-6 col-start-2 mt-130px">
          <span className="raleway font-bold text-6.255vw underline">
            SFRADY20@GMAIL.COM
          </span>
        </div>
        <div className="col-span-6 col-start-2 grid grid-cols-6 mt-100px children:(uppercase)">
          <div>LinkedIn</div>
          <div>GitHub</div>
          <div>Facebook</div>
          <div>Instagram</div>
          <div>Twitter</div>
        </div>
      </div>
      <div className="flex h-540px mt-130px">
        <div className="flex-1 grid grid-cols-4 pl-10 pb-20 items-end">
          <div>Des & Dev Steven Frady @2022 STEVEN FRADY</div>
        </div>
        <div className="flex-1 grid grid-cols-4 pr-10 pb-20 items-end bg-opacity-5 bg-black"></div>
      </div>
    </section>
  );
};

export default ContactSection;
