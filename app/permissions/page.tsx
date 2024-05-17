"use client";
import {
  DetailsList,
  DetailsListLayoutMode,
} from "@fluentui/react/lib/DetailsList";
import { Spinner } from "@fluentui/react/lib/Spinner";

import React, { useEffect } from "react";
import { PermissionItem } from "./types";

function Permissions() {
  const [items, setItems] = React.useState<PermissionItem[]>([]);
  const [originalItems, setOriginalItems] = React.useState<PermissionItem[]>(
    []
  );
  const [searchTerm, setSearchTerm] = React.useState("");

  const fetchFilePermissionData = async () => {
    const filePermissionData = await fetch("http://localhost:3000/api/proxy");
    return filePermissionData.json();
  };

  useEffect(() => {
    fetchFilePermissionData().then((permissions) => {
      if (permissions?.length) {
        const items: PermissionItem[] = permissions.map((item: any) => {
          return {
            PermissionID: item?.permissionID,
            User: "johnDoe111",
            FirstName: "John",
            LastName: "Doe",
            Comment: item?.comment,
            Write: item?.canWriteFiles,
            Delete: item?.canDeleteFiles,
            Upload: item?.canUploadFiles,
            Download: item?.canDownloadFiles,
          };
        });
        setItems(items);
        setOriginalItems(items);
      }
    });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    if (searchTerm === "") {
      setItems(originalItems);
    } else {
      const searchedValues = items.filter((item) => {
        return (
          item.User.toLowerCase().includes(searchTerm) ||
          item.FirstName.toLowerCase().includes(searchTerm) ||
          item.LastName.toLowerCase().includes(searchTerm)
        );
      });
      setItems(searchedValues);
    }
  };

  const handleAddUser = () => {
    console.log("Add User");
  };

  const columns = [
    {
      key: "column0",
      name: "Permission ID",
      fieldName: "PermissionID",
      minWidth: 50,
      maxWidth: 50,
      isResizable: true,
    },
    {
      key: "column1",
      name: "User",
      fieldName: "User",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      isRowHeader: true,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: "Sorted A to Z",
      sortDescendingAriaLabel: "Sorted Z to A",
      data: "string",
      isPadded: true,
    },
    {
      key: "column2",
      name: "First Name",
      fieldName: "FirstName",
      minWidth: 100,
      maxWidth: 100,
      isResizable: true,
      isRowHeader: true,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: "Sorted A to Z",
      sortDescendingAriaLabel: "Sorted Z to A",
      data: "string",
      isPadded: true,
    },
    {
      key: "column3",
      name: "Last Name",
      fieldName: "LastName",
      minWidth: 100,
      maxWidth: 100,
      isResizable: true,
      isRowHeader: true,
      isSorted: true,
      isSortedDescending: false,
      sortAscendingAriaLabel: "Sorted A to Z",
      sortDescendingAriaLabel: "Sorted Z to A",
      data: "string",
      isPadded: true,
    },
    {
      key: "column4",
      name: "Comment",
      fieldName: "Comment",
      minWidth: 100,
      maxWidth: 300,
      isResizable: true,
    },
    // {
    //   key: "column5",
    //   name: "Remove",
    //   fieldName: "Remove",
    //   minWidth: 100,
    //   maxWidth: 200,
    //   isResizable: true,
    // },
    // {
    //   key: "column6",
    //   name: "Read",
    //   fieldName: "Read",
    //   minWidth: 100,
    //   maxWidth: 200,
    //   isResizable: true,
    // },
    {
      key: "column7",
      name: "Write",
      fieldName: "Write",
      minWidth: 50,
      maxWidth: 50,
      isResizable: true,
      onRender: (item: any) => {
        return <input type="checkbox" checked={item.Write} title="Write" />;
      },
    },
    {
      key: "column8",
      name: "Download",
      fieldName: "Download",
      minWidth: 50,
      maxWidth: 50,
      isResizable: true,
      onRender: (item: any) => {
        return (
          <input type="checkbox" checked={item.Download} title="Download" />
        );
      },
    },
    {
      key: "column9",
      name: "Upload",
      fieldName: "Upload",
      minWidth: 50,
      maxWidth: 50,
      isResizable: true,
      onRender: (item: any) => {
        return <input type="checkbox" checked={item.Upload} title="Upload" />;
      },
    },
    {
      key: "column10",
      name: "Delete",
      fieldName: "Delete",
      minWidth: 50,
      maxWidth: 50,
      isResizable: true,
      onRender: (item: any) => {
        return (
          <input
            type="checkbox"
            checked={item.Delete}
            title="Delete"
            aria-label="Delete"
            aria-describedby="Delete"
          />
        );
      },
    },
  ];

  return (
    <section>
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        aria-label="Search"
        aria-describedby="Search"
        onChange={handleSearch}
        name="search"
        value={searchTerm}
      />
      <select title="Select user">
        <option value="Select">Select User</option>
        {originalItems?.map((item: any) => {
          return (
            <option key={item.permissionID} value={item.permissionID}>
              {item.User}
            </option>
          );
        })}
      </select>
      <button
        className="btn btn-sm btn-gradient-primary py-3"
        type="button"
        onClick={handleAddUser}
      >
        Add User
      </button>
      <Spinner label="Loading..." />
      <DetailsList
        items={items}
        columns={columns}
        setKey="none"
        layoutMode={DetailsListLayoutMode.justified}
        selectionPreservedOnEmptyClick={true}
        isHeaderVisible={true}
        enterModalSelectionOnTouch={true}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        checkButtonAriaLabel="select row"
      />
    </section>
  );
}

export default Permissions;
