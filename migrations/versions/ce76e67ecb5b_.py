"""empty message

Revision ID: ce76e67ecb5b
Revises: 337dee1a0142
Create Date: 2024-10-14 15:44:16.669101

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ce76e67ecb5b'
down_revision = '337dee1a0142'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('quest',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('label', sa.String(length=120), nullable=False),
    sa.Column('done', sa.Boolean(), nullable=False),
    sa.Column('onboard', sa.Boolean(), nullable=False),
    sa.Column('quest_difficulty_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['quest_difficulty_id'], ['difficulty.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('task')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('task',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('label', sa.VARCHAR(length=120), autoincrement=False, nullable=False),
    sa.Column('done', sa.BOOLEAN(), autoincrement=False, nullable=False),
    sa.Column('onboard', sa.BOOLEAN(), autoincrement=False, nullable=False),
    sa.Column('task_difficulty_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['task_difficulty_id'], ['difficulty.id'], name='task_task_difficulty_id_fkey'),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], name='task_user_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='task_pkey')
    )
    op.drop_table('quest')
    # ### end Alembic commands ###
