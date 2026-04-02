/**
 * A custom React hook to build a URL with query parameters dynamically.
 * @param baseUrl The base URL without any query parameters.
 * @param query An object containing the filter parameters of type TQuery.
 * @returns The constructed URL string.
 */
export function urlBuilder<TQuery extends Record<string, any>>(
    baseUrl: string,
    query: TQuery
): string {
    const searchParams = new URLSearchParams();

    for (const key in query) {
        if (Object.prototype.hasOwnProperty.call(query, key)) {
            const value = query[key];

            if (Array.isArray(value)) {
                const filteredArray = value.filter(
                    (item: string) =>
                        item !== null &&
                        item !== undefined &&
                        !(typeof item === "string" && item.trim() === "")
                );
                if (filteredArray.length > 0) {
                    searchParams.append(key, filteredArray.join(","));
                }
            } else {
                if (
                    value !== null &&
                    value !== undefined &&
                    !(typeof value === "string" && value.trim() === "")
                ) {
                    searchParams.append(key, String(value));
                }
            }
        }
    }

    const queryString = searchParams.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}
