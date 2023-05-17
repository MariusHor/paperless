import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactQueryProvider, FiltersProvider } from "providers";
import { queryClient } from "lib";
import { invoicesLoader } from "utils";
import { LayoutInvoices, LayoutInvoice, LayoutShared } from "layouts";
import {
  ErrorPage,
  Root,
  Invoices,
  InvoiceEdit,
  InvoiceCreate,
  InvoiceView,
} from "pages";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutShared />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Root />,
      },
      {
        path: "invoices",
        element: <LayoutInvoices />,
        loader: invoicesLoader(queryClient),
        children: [
          {
            index: true,
            element: <Invoices />,
            loader: invoicesLoader(queryClient),
          },
        ],
      },
      {
        path: "invoice",
        element: <LayoutInvoice />,
        children: [
          {
            index: true,
            element: <InvoiceCreate />,
          },
          {
            path: ":id",
            element: <InvoiceView />,
            children: [
              {
                path: "edit",
                element: <InvoiceEdit />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

const App = (): React.JSX.Element => {
  return (
    <ReactQueryProvider>
      <FiltersProvider>
        <RouterProvider router={router} />
      </FiltersProvider>
    </ReactQueryProvider>
  );
};

export default App;
