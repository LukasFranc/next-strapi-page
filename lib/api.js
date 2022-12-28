async function fetchAPI(query, { variables } = {}) {
    const res = await fetch(
        `${
            process.env.API_URL || 'https://lf-next-project.up.railway.app'
        }/graphql`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 97690333ea94cf2732868a0bf673d40e6d82901ecaaad6e2e6488de7067096db4e1473e9e62cf1492cb89e500fa82885aa741427ec63994110c8add454e478e46b47a2e472182ec7cf7b2d38eab1d7e7c808e3aad3d09694561fc020558e69365e054fbbd9642af2bf1d661b547e9cb12c78a5bf126b236cc22794037b8048a4`,
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
  }`)
    console.log(data, 'test')
    return data.categories
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