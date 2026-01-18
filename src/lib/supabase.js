import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tab operations
export const tabsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('tabs')
      .select('*')
      .order('order_position', { ascending: true })
    if (error) throw error
    return data
  },

  async create(tab) {
    const { data, error } = await supabase
      .from('tabs')
      .insert([tab])
      .select()
      .single()
    if (error) throw error
    return data
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('tabs')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async delete(id) {
    const { error } = await supabase
      .from('tabs')
      .delete()
      .eq('id', id)
    if (error) throw error
  },

  async reorder(tabs) {
    const updates = tabs.map((tab, index) => ({
      id: tab.id,
      order_position: index
    }))

    for (const update of updates) {
      const { error } = await supabase
        .from('tabs')
        .update({ order_position: update.order_position })
        .eq('id', update.id)
      if (error) throw error
    }
  }
}

// Card operations
export const cardsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('cards')
      .select('*, tabs(title)')
      .order('order_position', { ascending: true })
    if (error) throw error
    return data
  },

  async getByTab(tabId) {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('tab_id', tabId)
      .order('order_position', { ascending: true })
    if (error) throw error
    return data
  },

  async create(card) {
    const { data, error } = await supabase
      .from('cards')
      .insert([card])
      .select()
      .single()
    if (error) throw error
    return data
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('cards')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async delete(id) {
    const { error } = await supabase
      .from('cards')
      .delete()
      .eq('id', id)
    if (error) throw error
  }
}

// FAQ operations
export const faqsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('order_position', { ascending: true })
    if (error) throw error
    return data
  },

  async create(faq) {
    const { data, error } = await supabase
      .from('faqs')
      .insert([faq])
      .select()
      .single()
    if (error) throw error
    return data
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('faqs')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async delete(id) {
    const { error } = await supabase
      .from('faqs')
      .delete()
      .eq('id', id)
    if (error) throw error
  }
}

// Auth operations
export const authApi = {
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getSession() {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    return data.session
  },

  async getUser() {
    const { data, error } = await supabase.auth.getUser()
    if (error) throw error
    return data.user
  },

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  }
}
