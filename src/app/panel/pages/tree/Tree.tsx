import { deleteTree, getAllTree } from "@/api/tree";
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  InfoCircleOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { Alert, Dropdown, Empty, Modal, Tree } from "antd";
import Spin from "global/antd-kit/spin";
import useFetch from "global/hooks/useFetch";
import PageHeader from "global/shared/PageHeader";
import { useCallback, useEffect, useState } from "react";
import MyButton from "@/components/Button";
import useLog from "../../../../../ant-design/hooks/useLog";
import AddChildToTreeForm from "./AddChildToTreeForm";
import { DataNode } from "antd/es/tree";
import toast from "react-hot-toast";

const TreePage = () => {
  const querys = window.location.pathname.split("/")[2]

  const fetcher = useCallback(() => {
    return getAllTree(+querys?.parentId);
  }, []);

  const {
    data: rootTreeData,
    loading: rootTreeLoading,
    error,
  } = useFetch(fetcher);

  const [treeData, setTreeData] = useState(null);
  const [clickedTree, setClickedTree] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isAddModalShow, setShowAddModal] = useState(false);

  useLog(clickedTree);

  // handlers
  const showAddModal = () => setShowAddModal(true);

  const handleHideAddModal = () => {
    setShowAddModal(false);
    setIsEdit(false);
  };

  useEffect(() => {
    if (!rootTreeLoading && rootTreeData) {
      const treeDataSample = rootTreeData.data.map((item, index) => ({
        id: item.id,
        title: item.title,
        type: item.type,
        number: +item.number,
        isLeaf: !item.hasChildren,
        key: index.toString(),
        text: item.text,
        parentId: item.parentId,
        children: [],
      }));
      setTreeData(treeDataSample);
    }
  }, [rootTreeLoading, rootTreeData]);

  const handleDeleteTree = () => {
    const loading = toast.loading("در حال حذف...");
    deleteTree(clickedTree?.id)
      .then(async () => {
        loadMoreData({ key: clickedTree?.key });
        const finalData = removeNodeById(treeData, clickedTree?.id);
        setTreeData(finalData);
        toast.dismiss(loading);
        toast.success("با موفقیت حذف شد");
      })
      .catch((err) => {
        toast.dismiss(loading);
        toast.error(err?.message || "حذف با خطا مواجه شد");
      });
  };
  function removeNodeById(data, id) {
    return data.filter((item) => {
      if (item.id === id) {
        return false;
      } else if (item.children && item.children.length > 0) {
        item.children = removeNodeById(item.children, id);
        if (item.children.length === 0) {
          item.isLeaf = true;
        } else {
          item.isLeaf = false;
        }
      }
      return true;
    });
  }

  const items = [
    {
      label: (
        <button onClick={showAddModal} className="flex items-center gap-x-2">
          <PlusSquareOutlined style={{ color: "var(--color-primary)" }} />
          <span className="text-[16px]">افزودن</span>
        </button>
      ),
      key: "1",
    },
    {
      label: (
        <button
          className="flex items-center gap-x-2"
          onClick={() => {
            setIsEdit(true);
            showAddModal();
          }}
        >
          <EditOutlined style={{ color: "" }} />
          <span className="text-[16px]">ویرایش</span>
        </button>
      ),
      key: "3",
    },
    {
      label: (
        <button
          onClick={handleDeleteTree}
          title="آیا از حذف این مورد اطمینان دارید ؟"
          className="flex items-center gap-x-2"
        >
          <DeleteOutlined style={{ color: "red" }} />
          <span className="text-[16px]">حذف</span>
        </button>
      ),
      key: "2",
    },
  ];

  function foundId(treeData: DataNode[], key: string): DataNode | null {
    if (!treeData.length) return null;
    for (const item of treeData) {
      if (item.key === key) return item;
      if (item.children) {
        const result = foundId(item.children, key);
        if (result) return result;
      }
    }
    return null;
  }

  const updateTreeData = (
    list: DataNode[],
    key: React.Key,
    children: DataNode[]
  ): DataNode[] => {
    return list.map((node) => {
      if (node.key === key) {
        return {
          ...node,
          isLeaf: children.length === 0 ? true : false,
          children,
        };
      }
      if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children, key, children),
        };
      }
      return node;
    });
  };

  const loadMoreData = async ({ key, children }) => {
    const foundedTree = await foundId(treeData, key);
    const childData = await getAllTree(foundedTree?.id);

    const treeDataSample = childData.data.map((item, index) => ({
      id: item.id,
      title: item.title,
      text: item.text,
      number: +item.number,
      isLeaf: !item.hasChildren,
      key: `${key}-${index}`,
      type: item.type,
      parentId: item.parentId,
      children: [],
    }));

    setTreeData((origin) => {
      return updateTreeData(origin, key, treeDataSample);
    });
  };

  const EditTreeHandler = (id, newItem) => {
    const reuslt = replaceNodeById(treeData, id, newItem);
    setTreeData(reuslt);
  };

  function replaceNodeById(data, id, newObj) {
    return data.map((item) => {
      if (item.id === id) {
        return { ...item, ...newObj };
        // If the node matches the ID,
        // We replace it, so it can be.
      } else if (item.children && item.children.length > 0) {
        // If children there, we journey in,
        // With recursion's help, our quest to win.
        item.children = replaceNodeById(item.children, id, newObj);
      }
      return item;
    });
  }

  return (
    <>
      <PageHeader
        hasBack
        title="درختواره ویرایش"
        leftSection={
          <MyButton
            onClick={() => {
              showAddModal();
              setClickedTree(null);
            }}
          >
            افزودن شاخه اصلی
          </MyButton>
        }
      />

      {rootTreeLoading && (
        <div className="flex flex-col items-center justify-center mt-20 gap-y-5">
          <Spin />
          <p className="text-lg font-bold">در حال دریافت اطلاعات</p>
        </div>
      )}

      {rootTreeLoading === false && treeData?.length === 0 && (
        <Empty className="mt-20" description="هیچ درختواره ای ثبت نشده است" />
      )}

      {treeData?.length > 0 && (
        <div className="flex items-center mb-10 gap-x-2">
          <InfoCircleOutlined
            style={{ color: "var(--color-primary)", fontSize: "20px" }}
          />
          <span>برای انجام عملیات روی عنوان ها کلیک راست کنید</span>
        </div>
      )}

      {/* tree */}
      <Tree
        key={treeData}
        style={{ fontSize: "17px" }}
        showLine
        showIcon
        loadData={loadMoreData}
        treeData={treeData}
        switcherIcon={<DownOutlined />}
        titleRender={(item) => {
          return (
            <Dropdown
              placement="bottomRight"
              menu={{ items }}
              trigger={["contextMenu"]}
            >
              <div>{item.title}</div>
            </Dropdown>
          );
        }}
        onRightClick={({ event, node }) => {
          setClickedTree(node);
        }}
      />

      {/* modal */}

      <Modal
        title={
          <div className="px-2">
            {isEdit ? <span>ویرایش </span> : <span>ثبت یک مورد جدید</span>}
            {!isEdit && clickedTree?.title && (
              <div className="mt-2 mb-2">
                <span className="text-sm">والد : </span>
                <span className="text-sm text-text-grade3">
                  {clickedTree?.title}
                </span>
              </div>
            )}
          </div>
        }
        open={isAddModalShow}
        onCancel={handleHideAddModal}
        footer={[]}
        destroyOnClose
      >
        <AddChildToTreeForm
          loadMoreData={loadMoreData}
          hideModal={handleHideAddModal}
          clickedTree={clickedTree}
          setTreeData={setTreeData}
          isEdit={isEdit}
          EditTreeHandler={EditTreeHandler}
        />
      </Modal>
    </>
  );
};

export default TreePage;
