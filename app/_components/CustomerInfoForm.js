function CustomerInfoForm({ onSubmit, customer }) {
  return (
    <form
      onSubmit={onSubmit}
      onClick={(e) => e.stopPropagation()}
      className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:mt-7"
    >
      <div className="border-b border-slate-200 px-4 py-4 sm:px-6">
        <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
          Customer Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Enter your information to complete the order.
        </p>
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-6">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={customer?.name}
            onChange={handleCustomerChange}
            placeholder="Enter your name"
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="mb-1.5 block text-sm font-medium text-slate-700"
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
            className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
          />
        </div>

        {/* Address */}
        <div className="sm:col-span-2">
          <label
            htmlFor="address"
            className="mb-1.5 block text-sm font-medium text-slate-700"
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
            className="w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
          />
        </div>
      </div>
    </form>
  );
}

export default CustomerInfoForm;
