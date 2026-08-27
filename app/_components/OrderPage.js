"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";

const BUSINESS_WHATSAPP = "923222800880";

const orderSections = [
  {
    title: "Biscuits",
    columns: ["HR", "MP", "SP", "TP"],
    products: [
      "Sooper",
      "Sooper Chocolate",
      "Gluco",
      "Rio Strawberry",
      "Rio DC",
      "Lemon Sandwitch",
      "Chocolate Sandwitch",
      "Click",
      "Marie",
      "Butter Puff",
      "Pista",
      "Party",
      "Peanut Pik",
      "Chocolatious",
      "Choco Bite",
      "Choco Lava",
      "Saltish",
      "Whole Wheat",
    ],
  },
  {
    title: "Cakes",
    columns: ["STB", "CHO", "DC", "CAM"],
    products: [
      "Cakeup",
      "Cakeup Twin",
      "Triple Cake",
      "Sooper Cake",
      "Smile Donut",
      "Gluco Teddy",
    ],
  },
];

export default function OrderPage() {
  const [quantities, setQuantities] = useState({});
  const [activeCell, setActiveCell] = useState(null);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  function getKey(product, column) {
    return `${product}__${column}`;
  }

  function getQuantity(product, column) {
    return quantities[getKey(product, column)] || 0;
  }

  function selectCell(product, column) {
    setActiveCell(getKey(product, column));
  }

  function addQuantity() {
    if (!activeCell) return;

    setQuantities((prev) => ({
      ...prev,
      [activeCell]: (prev[activeCell] || 0) + 1,
    }));
  }
  function decQuantity() {
    if (!activeCell) return;

    if (quantities[activeCell] === 0) return;

    setQuantities((prev) => ({
      ...prev,
      [activeCell]: (prev[activeCell] || 0) - 1,
    }));
  }

  function handleCustomerChange(e) {
    const { name, value } = e.target;

    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const items = Object.entries(quantities).map(([key, quantity]) => {
      const [product, column] = key.split("__");

      return {
        product,
        column,
        quantity,
      };
    });

    if (items.length === 0) {
      alert("Please select at least one product.");
      return;
    }

    if (!customer.name.trim() || !customer.phone.trim()) {
      alert("Please enter your name and phone number.");
      return;
    }

    const itemsMessage = items
      .map(
        (item, index) =>
          `${index + 1}. ${item.product} - ${item.column}: ${item.quantity}`,
      )
      .join("\n");

    const message = `*New Order*

*Customer Information*
Name: ${customer.name}
Phone: ${customer.phone}
Address: ${customer.address || "Not provided"}

*Order Items*
${itemsMessage}

*Total Quantity:* ${totalItems}`;

    const whatsappUrl = `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank");
  }

  const totalItems = Object.values(quantities).reduce(
    (sum, quantity) => sum + quantity,
    0,
  );

  console.log(quantities[activeCell]);

  return (
    <main
      className="min-h-screen w-full overflow-x-hidden bg-slate-50"
      onClick={() => setActiveCell(null)}
    >
      <div className="mx-auto w-full max-w-6xl px-2 py-4 sm:px-4 sm:py-6 lg:px-6">
        {/* HEADER */}
        <div className="mb-4 flex items-center justify-between gap-2 sm:mb-6">
          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold text-slate-900 sm:text-2xl">
              Place Your Order
            </h1>

            <p className="mt-1 hidden text-sm text-slate-500 sm:block">
              Select a cell and tap Add to increase the quantity.
            </p>
          </div>

          {totalItems > 0 && (
            <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm sm:gap-2 sm:px-3 sm:py-2 sm:text-sm">
              <ShoppingCart size={15} />
              <span>{totalItems}</span>
            </div>
          )}
        </div>

        {/* ORDER SECTIONS */}
        <div className="space-y-4 sm:space-y-6">
          {orderSections.map((section) => (
            <section
              key={section.title}
              onClick={(e) => e.stopPropagation()}
              className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl"
            >
              {/* SECTION HEADER */}
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-3 py-3 sm:px-5 sm:py-4">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900 sm:text-lg">
                    {section.title}
                  </h2>

                  <p className="mt-0.5 text-[10px] text-slate-500 sm:text-xs">
                    Select a cell and tap Add
                  </p>
                </div>

                {/* SINGLE ADD BUTTON */}
                <div className="space-x-3">
                  <button
                    type="button"
                    disabled={
                      !activeCell ||
                      quantities[activeCell] === undefined ||
                      quantities[activeCell] === 0
                    }
                    onClick={decQuantity}
                    className="
                    h-9
                    shrink-0
                    rounded-lg
                    bg-slate-900
                    px-4
                    text-xs
                    font-semibold
                    text-white
                    transition
                    active:scale-95
                    disabled:cursor-not-allowed
                    disabled:opacity-30
                    sm:h-10
                    sm:px-5
                    sm:text-sm
                  "
                  >
                    <Minus size={18} />
                  </button>
                  <button
                    type="button"
                    disabled={!activeCell}
                    onClick={addQuantity}
                    className="
                    h-9
                    shrink-0
                    rounded-lg
                    bg-slate-900
                    px-4
                    text-xs
                    font-semibold
                    text-white
                    transition
                    active:scale-95
                    disabled:cursor-not-allowed
                    disabled:opacity-30
                    sm:h-10
                    sm:px-5
                    sm:text-sm
                    "
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* TABLE */}
              <div className="w-full">
                <table className="w-full table-fixed border-collapse">
                  <thead>
                    <tr className="bg-slate-50">
                      <th
                        className="
                          w-[44%]
                          border-b
                          border-r
                          border-slate-200
                          px-2
                          py-2.5
                          text-left
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-wide
                          text-slate-500
                          sm:w-[55%]
                          sm:px-5
                          sm:py-3
                          sm:text-xs
                        "
                      >
                        Product
                      </th>

                      {section.columns.map((column) => (
                        <th
                          key={column}
                          className="
                            w-[14%]
                            border-b
                            border-slate-200
                            px-0.5
                            py-2.5
                            text-center
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-wide
                            text-slate-500
                            sm:w-[11.25%]
                            sm:py-3
                            sm:text-xs
                          "
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {section.products.map((product) => (
                      <tr key={product}>
                        {/* PRODUCT */}
                        <td
                          className="
                            border-b
                            border-r
                            border-slate-100
                            bg-white
                            px-2
                            py-2
                            text-[11px]
                            font-medium
                            leading-tight
                            text-slate-800
                            sm:px-5
                            sm:py-2.5
                            sm:text-sm
                          "
                        >
                          {product}
                        </td>

                        {/* CELLS */}
                        {section.columns.map((column) => {
                          const key = getKey(product, column);
                          const quantity = getQuantity(product, column);
                          const isActive = activeCell === key;

                          return (
                            <td
                              key={column}
                              className="
                                border-b
                                border-slate-100
                                p-1
                              "
                            >
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  selectCell(product, column);
                                }}
                                className={`
                                  flex
                                  h-9
                                  w-full
                                  items-center
                                  justify-center
                                  rounded-md
                                  border
                                  transition
                                  active:scale-95
                                  sm:h-10
                                  ${
                                    isActive
                                      ? "border-slate-900 bg-slate-100 ring-1 ring-slate-900"
                                      : quantity > 0
                                        ? "border-slate-300 bg-slate-50"
                                        : "border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50"
                                  }
                                `}
                                aria-label={`Select ${product} ${column}`}
                              >
                                {quantity > 0 && (
                                  <span
                                    className={`
                                      text-xs
                                      font-bold
                                      sm:text-sm
                                      ${
                                        isActive
                                          ? "text-slate-900"
                                          : "text-slate-700"
                                      }
                                    `}
                                  >
                                    {quantity}
                                  </span>
                                )}
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>

        {/* CUSTOMER FORM */}
        <form
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()}
          className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:mt-6 sm:rounded-2xl"
        >
          <div className="border-b border-slate-200 px-3 py-3 sm:px-5 sm:py-4">
            <h2 className="text-sm font-semibold text-slate-900 sm:text-lg">
              Customer Information
            </h2>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Enter your information to complete the order.
            </p>
          </div>

          <div className="grid gap-3 p-3 sm:grid-cols-2 sm:gap-4 sm:p-5">
            {/* NAME */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-xs font-medium text-slate-700 sm:text-sm"
              >
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={customer.name}
                onChange={handleCustomerChange}
                placeholder="Enter your name"
                className="
                  h-10
                  w-full
                  rounded-lg
                  border
                  border-slate-300
                  px-3
                  text-sm
                  outline-none
                  focus:border-slate-900
                  focus:ring-2
                  focus:ring-slate-900/10
                  sm:h-11
                "
              />
            </div>

            {/* PHONE */}
            <div>
              <label
                htmlFor="phone"
                className="mb-1.5 block text-xs font-medium text-slate-700 sm:text-sm"
              >
                Phone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={customer.phone}
                onChange={handleCustomerChange}
                placeholder="03XX XXXXXXX"
                className="
                  h-10
                  w-full
                  rounded-lg
                  border
                  border-slate-300
                  px-3
                  text-sm
                  outline-none
                  focus:border-slate-900
                  focus:ring-2
                  focus:ring-slate-900/10
                  sm:h-11
                "
              />
            </div>

            {/* ADDRESS */}
            <div className="sm:col-span-2">
              <label
                htmlFor="address"
                className="mb-1.5 block text-xs font-medium text-slate-700 sm:text-sm"
              >
                Address
              </label>

              <textarea
                id="address"
                name="address"
                rows={3}
                value={customer.address}
                onChange={handleCustomerChange}
                placeholder="Enter your delivery address"
                className="
                  w-full
                  resize-none
                  rounded-lg
                  border
                  border-slate-300
                  px-3
                  py-2.5
                  text-sm
                  outline-none
                  focus:border-slate-900
                  focus:ring-2
                  focus:ring-slate-900/10
                "
              />
            </div>
          </div>

          {/* FOOTER */}
          <div className="border-t border-slate-200 bg-slate-50 p-3 sm:flex sm:items-center sm:justify-between sm:px-5 sm:py-4">
            <div className="mb-3 text-xs text-slate-500 sm:mb-0 sm:text-sm">
              {totalItems > 0 ? (
                <>
                  <span className="font-semibold text-slate-900">
                    {totalItems}
                  </span>{" "}
                  total quantity
                </>
              ) : (
                "No products selected"
              )}
            </div>

            <button
              type="submit"
              disabled={totalItems === 0}
              className="
                h-10
                w-full
                rounded-lg
                bg-slate-900
                px-5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-slate-700
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-40
                sm:h-11
                sm:w-auto
              "
            >
              Submit Order
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
