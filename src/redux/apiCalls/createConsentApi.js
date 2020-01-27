import apiWrapper from "../apiWrapper";
import { defaultHeaders } from "../../constants";

const createConsentApi = ({
  patientId,
  selectedPurposeValue,
  selectedStartDate,
  selectedEndDate,
  selectedExpiryDate,
  selectedRequestTypes
}) => {
  const selectedRequests = Object.keys(selectedRequestTypes).reduce(
    (preValue, currValue) =>
      selectedRequestTypes[currValue] ? [...preValue, currValue] : preValue,
    []
  );
  return apiWrapper(
    "post",
    `/consent-requests`,
    {
      consent: {
        patient: {
          id: patientId
        },
        purpose: {
          code: selectedPurposeValue
        },
        hiTypes: selectedRequests,
        permission: {
          dateRange: {
            from: selectedStartDate.toISOString(),
            to: selectedEndDate.toISOString()
          },
          dataExpiryAt: selectedExpiryDate.toISOString()
        }
      }
    },
    {
      ...defaultHeaders,
      Authorization: "RHIuIExha3NobWk="
    }
  );
};

export default createConsentApi;
