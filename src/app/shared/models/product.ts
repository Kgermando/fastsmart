export interface Product {
    id?: string;
    Title?: string;
    Prix?: number;
    Description?: string;
    productImageUrl?: string;
    Content?: string;
    // Payement?: string;
    CaterogyProduit?: string;
    CategorySecteur?: string;  // Category pour le secteur tel que Santé, Education, Transport, Institutions, Entreprise, Particuliers
    UrlTest?: string;  // Champs pour l'Url de test du site internet
    Rating?: number;    // Qualité du produit
    Support?: string;  // Temps de maintenace et assitance
    Created?: any
}
