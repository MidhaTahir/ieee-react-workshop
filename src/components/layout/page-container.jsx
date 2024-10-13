import { useEffect } from "react";
import { portalName } from "../../constants/configs";

function PageContainer({ documentTitle, children }) {
  useEffect(() => {
    let title = "";
    const isValidDocumentTitle =
      (typeof documentTitle === "string" && documentTitle.length) ||
      typeof documentTitle === "number";
    if (isValidDocumentTitle) title = documentTitle;
    else title = `${portalName?.length && portalName}`;

    document.title = title;
  }, [documentTitle]);

  return children;
}

export default PageContainer;
