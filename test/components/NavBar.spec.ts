import { mount } from '@vue/test-utils'
import NavBar from '../../src/components/UI/NavBar.vue'
import { nextTick } from 'vue'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { useStoreAuth } from '../../src/stores/storeAuth'
import { createTestingPinia } from '@pinia/testing'
import { useStoreBalance } from '../../src/stores/storeBalance'

describe('Navbar.vue', () => {
    let wrapper
    let mockedStoreAuth
    let mockedStoreBalance

    beforeEach(() => {
        wrapper = mount(NavBar, {
            global: {
                plugins: [createTestingPinia({ createSpy: vi.fn })],
                stubs: ['router-link']
            },
        })
        mockedStoreAuth = useStoreAuth()
        mockedStoreBalance = useStoreBalance()
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    test('should render the app name', () => {
        expect(wrapper.find('.navbar-brand').text()).toContain('Arithmetic Calculator')
    })

    test('should not show menu when not logged in', () => {
        expect(wrapper.find('.navbar-start').exists()).toBe(false)
        expect(wrapper.find('.navbar-end').exists()).toBe(false)
    })

    test('should show menu when logged in', async () => {
        mockedStoreAuth.user.username = 'foo';
        mockedStoreBalance.balance = 100;

        await nextTick()
        expect(wrapper.find('.navbar-start').exists()).toBe(true)
        expect(wrapper.find('button.is-success').exists()).toBe(true)
        expect(wrapper.find('button.is-danger').exists()).toBe(true)
    })

    test('should show user info when logged in', async () => {
        mockedStoreAuth.user.username = 'foo';
        mockedStoreBalance.balance = 100;

        await nextTick()
        expect(wrapper.find('button.is-success').text()).toBe('Balance: $100')
        expect(wrapper.find('button.is-danger').text()).toBe('Logout')
    })
})
