async function fetchAPI(query, { variables } = {}) {
    const res = await fetch(
        `${
            process.env.API_URL || 'https://lf-next-project.up.railway.app'
        }/graphql`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        }
    )

    const json = await res.json()
    if (json.errors) {
        console.error(json.errors)
        throw new Error('Failed to fetch API')
    }

    return json.data
}

export async function getArticles() {
    const data = await fetchAPI(`query Articles {
    articles(sort: "published_at:desc") {
      id
      title
      category {
        id
        name
      }
      image {
        url
        alternativeText
      }
    }
  }`)
    return data.articles
}

export async function getArticle(id) {
    const data = await fetchAPI(
        `query Articles($id: ID!) {
    article(id: $id) {
      id
      title
      content
      image {
        url
        alternativeText
      }
      category {
        id
        name
      }
      published_at
    }
  }`,
        { variables: { id } }
    )
    return data.article
}

export async function getCategories() {
    const data = await fetchAPI(`query Categories {
        categories {
            data{
              id
              attributes {
                categoryName           
              }
            }
        }
    }`
    )
    return data.categories
}

export async function getHomepage() {
    const data = await fetchAPI(`query Homepage {
        homepage {
            data{
                id
                attributes {
                    mainHero {
                        id
                        heroTitle
                        heroSubTitle
                        heroDescription
                        heroMainImageOrientation
                        heroMainImage {
                            data {
                                id
                                attributes {
                                    url
                                }
                            }
                        }
                        heroButton {
                            buttonTitle
                            buttonUrl                                                
                        }
                    }
                    mainSections {
                        id
                    }
                }
            }
        }
    }`
    )
    return data.homepage.data.attributes
}

export async function getCategory(id) {
    const data = await fetchAPI(
        `query Category($id: ID!) {
    category(id: $id) {
      id
      name
      articles {
        id
        title
        content
        image {
          url
          alternativeText
        }
        category {
          id
          name
        }
      }
    }
  }
`,
        { variables: { id } }
    )
    return data.category
}