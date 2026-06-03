def calculate_xp(value: int):
    """
    Simple XP calculation for now.
    Later we will make this dynamic.
    """
    return value * 10


def apply_xp(entity, xp_gained):

    entity.total_xp += xp_gained
    entity.current_xp += xp_gained

    while entity.current_xp >= 100 * entity.level:
        entity.current_xp -= 100 * entity.level
        entity.level += 1

    return entity