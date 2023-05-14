import fallbackImg from "../assets/illustration-empty.svg";

export const InvoiceListFallback = () => {
  return (
    <div className="-none mx-auto my-8 flex h-full w-fit grow flex-col items-center justify-center text-center lg:col-span-11 lg:col-start-2 lg:row-span-5 lg:row-start-2 lg:my-0">
      <img src={fallbackImg} alt="list is empty" />
      <h1 className="heading-md mt-8">There is nothing here</h1>
      <p className="paragraph-secondary mx-auto mt-6 max-w-42 text-center">
        Create an invoice by clicking the New Invoice button and get started
      </p>
    </div>
  );
};