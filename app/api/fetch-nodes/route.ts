import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase env variable. TEST');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const level = searchParams.get('level');

  if (!level) {
    return NextResponse.json({ error: 'No level requested' }, { status: 400 });
  }
  try {
    const { data, error } = await supabase
      .from('nodes')
      .select('path, content')
      .eq('level', level)
      .order('path', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }); //supabase returns an array of objs where each obj is a row.
  } catch (error) {
    return NextResponse.json(
      { error: 'Faiiled to Fetch noddes' },
      { status: 500 }
    );
  }
}
