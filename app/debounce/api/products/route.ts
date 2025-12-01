// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/app/debounce/mock/data';

import { ApiResponse, Product } from '@/app/debounce/debounce';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const nameQuery = searchParams.get('name');

    if (!nameQuery) {
      return NextResponse.json<ApiResponse<Product[]>>({
        success: true,
        count: products.length,
        data: products
      });
    }

    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(nameQuery.toLowerCase())
    );

    if (filteredProducts.length === 0) {
      return NextResponse.json<ApiResponse<Product[]>>({
        success: false,
        message: `No products found with name: ${nameQuery}`,
        count: 0,
        data: []
      }, { status: 404 });
    }

    return NextResponse.json<ApiResponse<Product[]>>({
      success: true,
      count: filteredProducts.length,
      searchTerm: nameQuery,
      data: filteredProducts
    });

  } catch (error) {
    return NextResponse.json<ApiResponse<Product[]>>({
      success: false,
      message: 'Internal error at finding products',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}