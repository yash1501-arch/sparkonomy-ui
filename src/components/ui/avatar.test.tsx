import { render, screen } from '@testing-library/react'
import { Avatar, AvatarImage, AvatarFallback } from './avatar'

describe('Avatar', () => {
    it('renders avatar with fallback', () => {
        render(
            <Avatar>
                <AvatarFallback>AB</AvatarFallback>
            </Avatar>
        )
        expect(screen.getByText('AB')).toBeInTheDocument()
    })

    it('renders avatar with both image and fallback', () => {
        render(
            <Avatar>
                <AvatarImage
                    src="/test.png"
                    alt="Test Avatar"
                />
                <AvatarFallback>AB</AvatarFallback>
            </Avatar>
        )
        expect(screen.getByText('AB')).toBeInTheDocument()
    })
})
