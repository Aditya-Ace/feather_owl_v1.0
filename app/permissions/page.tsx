"use client";
import {
  DetailsList,
  DetailsListLayoutMode,
} from "@fluentui/react/lib/DetailsList";
import { Spinner } from "@fluentui/react/lib/Spinner";
import React, { useEffect } from "react";
import {
  Breadcrumb,
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
  ISearchBoxStyles,
  PrimaryButton,
  SearchBox,
  Stack,
  initializeIcons,
} from "@fluentui/react";

import { PermissionItem } from "./types";
import styles from "./page.module.css";

const searchBoxStyles: Partial<ISearchBoxStyles> = {
  root: { width: 300 },
};
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

function Permissions() {
  const [items, setItems] = React.useState<PermissionItem[]>([]);
  const [originalItems, setOriginalItems] = React.useState<PermissionItem[]>(
    []
  );

  const fetchFilePermissionData = async () => {
    const filePermissionData = await fetch("http://localhost:3000/api/proxy");
    return filePermissionData.json();
  };

  const users = React.useMemo(
    () => [
      {
        username: "johnDoe111",
        firstName: "John",
        lastName: "Doe",
      },
      {
        username: "janeDoe222",
        firstName: "Jane",
        lastName: "Doe",
      },
      {
        username: "jessieDoe333",
        firstName: "Jessie",
        lastName: "Doe",
      },
      {
        username: "josephDoe333",
        firstName: "Joseph",
        lastName: "Doe",
      },
    ],
    []
  );

  initializeIcons();

  useEffect(() => {
    fetchFilePermissionData().then((permissions) => {
      if (permissions?.length) {
        const items: PermissionItem[] = users.flatMap((user: any) => {
          return permissions.map((item: any) => ({
            PermissionID: item?.permissionID,
            User: user.username,
            FirstName: user.firstName,
            LastName: user.lastName,
            Comment: item?.comment,
            Write: item?.canWriteFiles,
            Delete: item?.canDeleteFiles,
            Upload: item?.canUploadFiles,
            Download: item?.canDownloadFiles,
          }));
        });
        setItems(items);
        setOriginalItems(items);
      }
    });
  }, [users]);

  const handleSearch = (value: string) => {
    const searchTerm = value.toLowerCase();
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

  const handleSelectUser = (selectedUser: IDropdownOption | undefined) => {
    console.log(selectedUser);
    if (!selectedUser || !selectedUser.key || selectedUser.key === "Select") {
      setItems(originalItems);
      return;
    }
    const searchedValues = originalItems.filter((item) => {
      return item.User.toLowerCase().includes(selectedUser?.text.toLowerCase());
    });
    setItems(searchedValues);
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

  const options: IDropdownOption[] = React.useMemo(
    () => [
      {
        key: "Select",
        text: "Select",
      },
      ...users.map((user: any) => {
        return {
          key: user.username,
          text: user.username,
        };
      }),
    ],
    [users]
  );

  return items.length === 0 ? (
    <Spinner label="Loading..." />
  ) : (
    <section className={styles.permissionsContainer}>
      <div className={styles.permissionContainer}>
        <div>
          <div className={styles.permissionsControl}>
            <SearchBox
              styles={searchBoxStyles}
              placeholder="Search"
              onEscape={(ev) => {
                handleSearch("");
              }}
              onClear={(ev) => {
                handleSearch("");
              }}
              onSearch={(newValue) => handleSearch(newValue)}
            />
            <div className={styles.permissionsControl_inner}>
              <Dropdown
                placeholder="Select User"
                options={options}
                styles={dropdownStyles}
                onChange={(e, item) => handleSelectUser(item)}
              />
              <PrimaryButton text="Add User" onClick={handleAddUser} />
            </div>
          </div>
        </div>
        <div>
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
        </div>
      </div>
    </section>
  );
}

export default Permissions;
