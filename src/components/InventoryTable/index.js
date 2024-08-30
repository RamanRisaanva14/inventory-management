import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import {
  MdRemoveShoppingCart,
  MdOutlineCategory,
  MdModeEdit,
  MdDelete,
} from "react-icons/md";

import { RiExchangeDollarFill } from "react-icons/ri";

import { IoEyeOff, IoEyeSharp } from "react-icons/io5";
import styles from "./styles.module.css";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";

const InventoryTable = ({ isAdmin }) => {
  const [data, setData] = useState([]);
  const [disbale, setDisable] = useState(false);


  useEffect(() => {
    axios
      .get("https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const stats = [
    {
      icon: <FaShoppingCart size={30} />,
      label: "Total products",
      value: 9,
    },
    {
      icon: <RiExchangeDollarFill size={30} />,
      label: "Total store value",
      value: "24,000",
    },
    {
      icon: <MdRemoveShoppingCart size={30} />,
      label: "Out of stock",
      value: 9,
    },
    {
      icon: <MdOutlineCategory size={30} />,
      label: "No of category",
      value: 2,
    },
  ];

  const handleDelete = (index) => {
    const temp = [...data];
    temp.filter((t, i) => i !== index);
    setData([...temp]);
  };

  


  return (
    <div>
      <h1 className="text-white text-3xl">Inventory stats</h1>

      <div className="mt-5 flex gap-4">
        {stats?.map((item, index) => (
          <div key={index} className={styles.stats_box}>
            {item.icon}
            <div>
              <p className="text-12">{item.label}</p>
              <p className="mt-[2px] text-[30px] font-semibold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <TableContainer
        component={Paper}
        className="min-w-full !bg-[#292A2D] mt-5 !rounded-lg !border-opacity-50 !border-white !overflow-hidden"
      >
        <Table className="!border-opacity-50 !border-white">
          <TableHead className="">
            <TableRow>
              <TableCell>
                <p className={styles.table_header}>Name</p>
              </TableCell>
              <TableCell>
                <p className={styles.table_header}>Category</p>
              </TableCell>
              <TableCell>
                <p className={styles.table_header}>Price</p>
              </TableCell>
              <TableCell>
                <p className={styles.table_header}>Quantity</p>
              </TableCell>
              <TableCell>
                <p className={styles.table_header}>Value</p>
              </TableCell>
              <TableCell>
                <p className={styles.table_header}>Action</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item, index) => {
              return (
                <TableRow
                  key={index}
                  className={`!border-0 ${
                    index === data.length - 1
                      ? "!border-b-0 !border-0"
                      : "!border-b !border-b-white !border-opacity-30"
                  }`}
                >
                  <TableCell
                    className={`${styles.table_cell} ${
                      disbale && "text-opacity-40"
                    } `}
                  >
                    {item?.name}
                  </TableCell>
                  <TableCell
                    className={`${styles.table_cell} ${
                      disbale && "text-opacity-40"
                    }`}
                  >
                    {item?.category}
                  </TableCell>
                  <TableCell
                    className={`${styles.table_cell} ${
                      disbale && "text-opacity-40"
                    }`}
                  >
                    {item?.price}
                  </TableCell>
                  <TableCell
                    className={`${styles.table_cell} ${
                      disbale && "text-opacity-40"
                    }`}
                  >
                    {item?.quantity}
                  </TableCell>
                  <TableCell
                    className={`${styles.table_cell} ${
                      disbale && "text-opacity-40"
                    }`}
                  >
                    {item?.value}
                  </TableCell>
                  <TableCell
                    className={`${styles.table_cell} ${
                      isAdmin && "!text-white"
                    }`}
                  >
                    <button
                      disabled={!isAdmin}
                      className={`text-green-800 pl-2 ${
                        isAdmin && "cursor-pointer"
                      }`}
                
                    >
                      <MdModeEdit />
                    </button>
                    <button
                      className={`text-purple-400 pl-2 ${
                        isAdmin && "cursor-pointer"
                      }`}
                      onClick={() => setDisable(!disbale)}
                    >
                      {disbale ? <IoEyeOff /> : <IoEyeSharp />}
                    </button>
                    <button
                      disabled={!isAdmin}
                      onClick={() => handleDelete(index)}
                      className={`text-red-500 pl-2 ${
                        isAdmin && "cursor-pointer"
                      }`}
                    >
                      <MdDelete />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default InventoryTable;
