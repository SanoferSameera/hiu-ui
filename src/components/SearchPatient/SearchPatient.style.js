import styled from "styled-components";

const SearchPatientStyles = styled.div`
  .root {
    padding: 2px 2px 2px 10px;
    display: flex;
    alignitems: center;
    width: 400;
  }
  .search-bar {
    display: flex;
    align-items: flex-start;
  }
  .fiduciary-text-field {
    width: 60px;
  }
  #search-field-helper-text {
    color: red;
  }
`;

export default SearchPatientStyles;
