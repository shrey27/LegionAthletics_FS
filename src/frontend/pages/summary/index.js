import "./summary.css";
import { Fragment } from "react";
import SummaryCard from "./SummaryCard";
import { useCartAPICtx, useOrders } from "../../context";
import { Loader, Navbar, Footer, Deals } from "../../components";
import { homepageItems } from "../../utility/constants";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../../routes/routes";
import { months } from "../../utility/constants";

export default function Orders() {
  const { ordersData, ordersLoader } = useOrders();
  return (
    <Fragment>
      <Navbar />
      {ordersData.map((elem) => {
        const {
          cartList,
          name,
          phone,
          email,
          orderDate,
          eta,
          deliveryAddress,
        } = elem;
        let orderDateModified = new Date(orderDate);
        const orderdateMonth = months[orderDateModified.getMonth()];
        return (
          <div key={elem._id}>
            {!cartList?.length ? (
              <img
                src="empty.webp"
                alt="empty"
                className="image__empty img--md"
              />
            ) : (
              <div className="mg-full">
                <h1 className="primary lg sb cen mg-full">ORDER SUMMARY</h1>
                <h1 className="primary md sb cen mg-full">
                  Date:{" "}
                  {`${orderdateMonth} ${
                    orderDateModified.getDate() < 10
                      ? "0" + orderDateModified.getDate()
                      : orderDateModified.getDate()
                  }, ${orderDateModified.getFullYear()}`}
                </h1>
                <hr />
                <hr />
                <div className="card--container">
                  {ordersLoader ? (
                    <Loader />
                  ) : (
                    cartList?.map((elem, index) => {
                      return (
                        <SummaryCard
                          key={elem._id}
                          {...elem}
                          name={name}
                          phone={phone}
                          email={email}
                          orderDate={orderDate}
                          eta={eta}
                          deliveryAddress={deliveryAddress}
                        />
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      <Deals
        items={[...homepageItems].slice(-4)}
        name="Start Shopping with our Best-Sellers"
        noButton={true}
      />
      <div className="flex-ct-ct xs-s">
        <Link className="btn btn--error btn--lg sb cen" to={PRODUCTS}>
          View All
        </Link>
      </div>
      <Footer />
    </Fragment>
  );
}
