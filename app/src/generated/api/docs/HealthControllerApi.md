# HealthControllerApi

All URIs are relative to *https://goormthon-5.goorm.training*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**health**](#health) | **GET** /api/health | |

# **health**
> { [key: string]: string; } health()


### Example

```typescript
import {
    HealthControllerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new HealthControllerApi(configuration);

const { status, data } = await apiInstance.health();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**{ [key: string]: string; }**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

